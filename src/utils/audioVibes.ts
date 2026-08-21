import { CHALET_AUDIO_DATA_URI } from './audioTrack';

type AudioListener = (isPlaying: boolean) => void;

class SoundscapeEngine {
  private audioElement: HTMLAudioElement | null = null;
  private isCurrentlyPlaying = false;
  private listeners: Set<AudioListener> = new Set();
  private audioSrc: string = CHALET_AUDIO_DATA_URI;

  constructor() {
    // Lazy initialized on first user gesture to comply with browser autoplay policy
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    // Emit current state immediately to the new listener
    listener(this.isSoundPlaying());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(state: boolean) {
    this.isCurrentlyPlaying = state;
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error('Error in audio listener:', err);
      }
    });
  }

  private getOrCreateAudio(): HTMLAudioElement {
    if (!this.audioElement) {
      const audio = new Audio();
      audio.src = this.audioSrc;
      audio.loop = true;
      audio.volume = 0.65;
      audio.preload = 'auto';

      // Mobile safari and chrome video/audio attributes
      audio.setAttribute('playsinline', 'true');
      audio.setAttribute('webkit-playsinline', 'true');

      audio.addEventListener('playing', () => {
        this.notifyListeners(true);
      });

      audio.addEventListener('pause', () => {
        this.notifyListeners(false);
      });

      audio.addEventListener('ended', () => {
        this.notifyListeners(false);
      });

      audio.addEventListener('error', (e) => {
        console.warn('Audio playback error:', e);
        this.notifyListeners(false);
      });

      this.audioElement = audio;
    }
    return this.audioElement;
  }

  public isSoundPlaying(): boolean {
    if (this.audioElement) {
      return !this.audioElement.paused && !this.audioElement.ended && this.audioElement.currentTime > 0;
    }
    return this.isCurrentlyPlaying;
  }

  public async play(): Promise<boolean> {
    try {
      const audio = this.getOrCreateAudio();
      audio.muted = false;
      
      await audio.play();
      this.notifyListeners(true);
      return true;
    } catch (err) {
      console.warn('Playback could not start:', err);
      this.notifyListeners(false);
      return false;
    }
  }

  public pause(): void {
    if (this.audioElement) {
      try {
        this.audioElement.pause();
      } catch (e) {
        console.warn('Pause error:', e);
      }
    }
    this.notifyListeners(false);
  }

  public stop(): void {
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch (e) {
        console.warn('Stop error:', e);
      }
    }
    this.notifyListeners(false);
  }

  public toggleSound(_mode?: string): boolean {
    if (this.isSoundPlaying()) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setAudioSource(url: string): void {
    this.audioSrc = url;
    if (this.audioElement) {
      const wasPlaying = this.isSoundPlaying();
      this.audioElement.src = url;
      this.audioElement.load();
      if (wasPlaying) {
        this.play();
      }
    }
  }
}

export const soundscape = new SoundscapeEngine();

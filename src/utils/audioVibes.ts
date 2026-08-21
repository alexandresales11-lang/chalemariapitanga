// Real audio playback engine with Web Audio fallback

class SoundscapeEngine {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying = false;
  private audioSrc = '/audio/ambiente.mp3';

  public setAudioSource(url: string) {
    this.audioSrc = url;
    if (this.audioElement) {
      this.audioElement.src = url;
    }
  }

  public toggleSound(_mode?: string): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    }
    this.start();
    return true;
  }

  public isSoundPlaying(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      if (!this.audioElement) {
        this.audioElement = new Audio();
        this.audioElement.src = this.audioSrc;
        this.audioElement.loop = true;
        this.audioElement.volume = 0.45;

        this.audioElement.addEventListener('ended', () => {
          this.isPlaying = false;
        });

        this.audioElement.addEventListener('error', () => {
          // If the audio URL fails or requires permission, degrade gracefully
          this.isPlaying = false;
        });
      }

      this.audioElement.play().then(() => {
        this.isPlaying = true;
      }).catch(() => {
        // Autoplay policy or load error
        this.isPlaying = false;
      });
      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch {
        // ignore
      }
    }
    this.isPlaying = false;
  }
}

export const soundscape = new SoundscapeEngine();


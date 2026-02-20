export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];

  /**
   * Request permission and start recording.
   */
  async start(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.chunks = [];
      
      this.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) this.chunks.push(e.data);
      };
      
      this.mediaRecorder.start();
    } catch (e) {
      console.error('Microphone permission denied or error:', e);
      throw e;
    }
  }

  /**
   * Stop recording and return the audio Blob.
   */
  stop(): Promise<Blob> {
    return new Promise((resolve) => {
        if (!this.mediaRecorder) {
            resolve(new Blob());
            return;
        }
        
        this.mediaRecorder.onstop = () => {
            const blob = new Blob(this.chunks, { type: 'audio/webm' });
            // Stop all tracks to release microphone
            this.mediaRecorder?.stream.getTracks().forEach(t => t.stop());
            this.mediaRecorder = null;
            resolve(blob);
        };
        
        this.mediaRecorder.stop();
    });
  }
}

export const audioRecorder = new AudioRecorder();

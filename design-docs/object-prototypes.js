var TrackPrototype = {
  filePath: "/volumes/external1/mp3-data/something.mp3",

  // Max volume (DB) - For training set files, do a simple peak normalization
  // to 0db before adding files to the set. This should be adequate assuming
  // our set is composed of professionally mastered files, but we may need to
  // scrub out some noise?
  maxVolume: 0,

  // Integrated loudness is measured in LUFS as per EBU R128 specification
  integratedLoudness: -14,
  slices: [
    {
      // Slices are pieces of the track, probably split using beat detection
      // and probably should be 1 bar long, but experiment here
      time: { start: 0, end: 1874 }, // Slice into bars in MS (ex: 128bpm)

      // LUFS value for the slice in all frequency ranges
      integratedLoudness: -14,

      // For each slice, detect boundaries to split into EQ bands
      // 50-60hz: Boom/Thump  |  100-200hz: Punchy/Rich/Booming
      // 200-500hz: Warmth/Weight/Mud  |  500-1000hz: Body/Tone
      // 1-2khz: Edge/Bite (Low)  |  2-5khz: Edge/Bite (High)
      // 5-10khz: Clarity/Snap/Tops  |  10-16khz: Bright/Breathy
      // 16-99khz: Airy/Sparkle/Space

      // If a band doesn't meet a certain loudness, consider empty
      // Ranges not covered will be mixed unedited from original file (?)
      // Call these bandSlices if implemented with classical OOP
      bands: [
        {
          frequencyRange: { min: 50, max: 60 }, // Min/max of band (hz)
          integratedLoudness: -18, // LUFS value for bandSlice

          // The target loudness is a LUFS to pass to the normalization
          // algorithm to use on this band.
          targetLoudness: -14,

          // Loudness range (0-20, default 7 as per loudnorm algorithm)
          // Affects the amount the louder audio will be compressed
          targetLoudnessRange: 7,

          // Stereo will be read by an average of correlation between left and
          // right channel for this bar.
          // Correlation: Inverted: -1  |  Stereo: 0  |  Mono: +1
          // Correlation:Width: -1: 2.00  |  0: 1.00  |  1: 0.00
          // Width = (Correlation * -1) + 1
          stereo: {
            correlation: 0.25,
            // Width is based on % on Ableton utility width (mid/side mix)
            width: 0.75, // (0.25 * -1) + 1 = 0.75
            target: {
              width: 1.00, // Target width
              // Our target and width tell us
              multiplyBy: 1.3, // Target width / width
              // Crossfade between pure mid channel and pure side channel
              // to build gain on new signal. Might not be this simple but
              // not reinventing the wheel here
              midGain: 0.65,
              sideGain: 0.35
            }
          }
        }
      ]
    }
  ]
};

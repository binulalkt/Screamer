document.addEventListener('DOMContentLoaded', function() {
    // Function to update the sound level bar
    function updateMeterBar(soundLevel) {
        const meterBar = document.getElementById('meter-bar');
        const wave1 = document.getElementById('wave1');
        const wave2 = document.getElementById('wave2');
        const wave3 = document.getElementById('wave3');
        const logoWrap = document.getElementById('logo-wrap');
        const logo = document.getElementById('logo');
        
        if (meterBar) {
            // Clamp sound level between 50 dB and 100 dB
            const clampedLevel = Math.min(Math.max(soundLevel, 50), 100);
            // Convert dB to percentage
            const percentage = (clampedLevel - 50) / 50 * 100;

            
            // Update the width of the meter bar
            wave1.style.setProperty('bottom', `${percentage + 50}%`);
            wave2.style.setProperty('bottom', `${percentage + 50}%`);
            wave3.style.setProperty('bottom', `${percentage + 50}%`);

            meterBar.style.setProperty('height', `${percentage}%`);

            

            soundRecords.push(clampedLevel);

            if(clampedLevel > 60 && clampedLevel < 90) {
                maintained = true;
            } else if(clampedLevel > 90) {
                crossed = true;
            } else {
                maintained = false;
            }

            const computedStyle = window.getComputedStyle(meterBar);
            const height = computedStyle.getPropertyValue('height');
            const parentElement = meterBar.parentElement;
            const parentHeight = window.getComputedStyle(parentElement).getPropertyValue('height');
            const heightValue = parseFloat(height);
            const parentHeightValue = parseFloat(parentHeight);
            const heightPercentage = (heightValue / parentHeightValue) * 100;
            if(heightPercentage > 40) {
               
                logo.style.setProperty('opacity', 1);
            } else {
                logo.style.setProperty('opacity', 0);
            }

            
            // Update the color based on percentage
            const color = percentage <= 50 ? '#13ade6' : '#13ade6';
            meterBar.style.setProperty('--meter-color', color);
            
            // Update the sound level text
            // document.getElementById('sound-level').textContent = `${clampedLevel.toFixed(1)} dB`;
        } else {
            console.error('Element with ID "meter-bar" not found.');
        }
    }
          let counter = 40;
          const maxLevel = 100;
          let smoothedCounter = counter; // To store the smoothed value
          const smoothingFactor = 0.2; // Adjust this value to control the smoothing effect

    // Access the microphone and stream audio
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            
            // Configure the analyser node
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            let previousLevel =40; // Initialize with 50 dB

            // Update sound level in real-time
            function updateSoundLevel() {
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
            const decibels = mapRange(average, 0, 255, 50, 100); // Assuming the dB is mapped to 0-100 range
                         const smoothedLevel = previousLevel * 0.8 + decibels * 0.2;
             previousLevel = smoothedLevel;
console.log( `db-----: ${decibels}vw`);
            // Update the counter based on decibels
            // if(ropMiddleHeight,10){
                // decibels=0
            // }
            if (decibels > 55) {//was 60 on test 1
                //   if(ropMiddleHeight>12){
                
            
              counter = Math.min(counter + 0.3, maxLevel); // Increment counter if below maxLevel
console.log(`counte: ${counter}vw`);
if (counter>70){
 counter = Math.min(counter + 0.02, maxLevel); // Increment counter if below maxLevel

}
            //   }
            //   else
            //   {
            //       counter = Math.min(counter + 0.02, maxLevel); // Increment counter if below maxLevel
console.log(counter);
            //   }
              
            } else {
              counter = Math.max(counter - 0.4, 40); // Decrement counter if above 40
            }

            // Smooth the counter value
            smoothedCounter = smoothedCounter * (1 - smoothingFactor) + counter * smoothingFactor;

            updateMeterBar(smoothedCounter);
            requestAnimationFrame(updateSoundLevel);
          }
            
            // Start updating sound level
            updateSoundLevel();
        })
        .catch(function(err) {
            console.error('Error accessing microphone:', err);
        });
    
    const soundRecords = [];

    const startRange = 50;

    const endRange = 70;
    
    //Threshold maintain
    let maintained = false;

    //Crossed range
    let crossed = false;

    //redirection logic

    setTimeout(() => {
        maintained = true;
        soundRecords.forEach((soundLevel) => {
            if(soundLevel < startRange || soundLevel > endRange) {
                maintained = false;
            }
        })
        // if(maintained ) {
        if(counter===100) {

           window.location.href = 'success.html';
        } else {
            window.location.href = 'fail.html';
        }
    }, 12000);

    // Helper function to map range
    function mapRange(value, minIn, maxIn, minOut, maxOut) {
        return minOut + (maxOut - minOut) * ((value - minIn) / (maxIn - minIn));
    }
});

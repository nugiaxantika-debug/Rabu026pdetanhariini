const vredenYt = require('@vreden/youtube_scraper');
async function run() {
        let videos = [];
        let searchSuccess = false;
        
        try {
           const ytSearch = await vredenYt.search("tiktok bikini compilation");
           if (ytSearch && ytSearch.status && ytSearch.results && ytSearch.results.length > 0) {
              videos = ytSearch.results.filter(v => v.type === 'video' && v.seconds <= 600);
              if (videos.length === 0) {
                 videos = ytSearch.results.filter(v => v.type === 'video');
              }
              searchSuccess = true;
           }
        } catch (searchErr) {
           console.log("vredenYt search failed, trying fallback...", searchErr.message);
        }
        
        // Fallback search using youtube-ext
        if (!searchSuccess) {
           try {
              const yt = (await import('youtube-ext')).default || (await import('youtube-ext'));
              const fallbackSearch = await yt.search("tiktok bikini compilation");
              if (fallbackSearch && fallbackSearch.videos && fallbackSearch.videos.length > 0) {
                 // Format to match expected structure
                 videos = fallbackSearch.videos.map(v => ({
                    url: v.url,
                    title: v.title,
                    type: 'video',
                    seconds: v.duration ? (v.duration.seconds || 0) : 0
                 })).filter(v => v.seconds <= 600);
                 
                 if (videos.length === 0) {
                    videos = fallbackSearch.videos.map(v => ({
                        url: v.url,
                        title: v.title,
                        type: 'video'
                    }));
                 }
                 searchSuccess = true;
              }
           } catch (fallbackErr) {
              console.log("Fallback search also failed:", fallbackErr.message);
           }
        }

        if (videos.length > 0) {
           // Try up to 3 different videos
           const shuffledVideos = videos.sort(() => 0.5 - Math.random());
           let maxAttempts = Math.min(3, shuffledVideos.length);
           
           for (let i = 0; i < maxAttempts; i++) {
              const randomVideo = shuffledVideos[i];
              try {
                const dlRes = await vredenYt.ytmp4(randomVideo.url);
                
                if (dlRes && dlRes.status && dlRes.download && dlRes.download.url) {
                  console.log("Success! " + dlRes.download.url);
                  return; // Success
                }
              } catch (dlErr) {
                console.error(`Failed to download video ${i}:`, dlErr.message);
              }
           }
        }
}
run();

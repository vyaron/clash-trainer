
const audioCountUrls = Array(9).fill().map((_, i) => `static/audio/count/${i+1}.mp3`)

var urlsToCache = [
    '/',
'static/js/manifest.12f6ce320af2feba917c.js',
'static/js/vendor.cd6db8a6ba4b2bf1deb3.js',
'static/js/app.fce526055f2ad911db5e.js',
'static/img/logo.png',
'static/img/champion.png',
'static/audio/ready.ogg',
'static/audio/bg.ogg',
'static/audio/win.mp3',
'static/audio/lose.mp3',
'static/audio/attack1.mp3',
'static/audio/attack2.mp3',
'static/audio/gling.mp3',
'https://fonts.gstatic.com/s/rammettoone/v5/mh0uQ1tV8QgSx9v_KyEYPBampu5_7CjHW5spxoeN3Vs.woff2',
...audioCountUrls
];

self.addEventListener('install', event => {

    // const imgPromises = fetch('static/data/cards.json')
    //     .then(res => res.json())
    //     .then(cards => cards.map(card=>card.idName))
    //     .then(idNames => idNames.map(idName => `static/img/cards/${idName}.png` ))
    //     .then(urls => urls.map(url => fetch(url) ))



    event.waitUntil(
    
        caches.open('clash-cache').then(cache => {
                // General structure:
                // cache.put(request, response)
                // Atomic: All or None will be added
                // cache.addAll(['/one', '/two'])
                return cache.addAll(urlsToCache)
        })
    );
    
});

    

self.addEventListener('fetch', event => {
    console.log('Fetch of: ', event.request);

    // event.respondWith(new Response('Hello <b>World</b>', {headers: {'Content-Type' : 'text/html'}}));
    //if (event.request.url.endsWith('.gif'))  event.respondWith(fetch('img/van.jpg'))

    // event.respondWith( 
    //     fetch(event.request)
    //     .then(res => res.status === 404? new Response('Not Found Dude') : res)
    //     .catch(err => new Response('Big Problem')) 
    // )


    event.respondWith(
        //  caches.match( event.request ).then(response => response || fetch(event.request)  ) 
        caches.match( event.request ).then(response => {
            if (response) {
                console.log('SW served from Cache!', event.request.url);
            } else {
                console.log('SW Need to fetch', event.request.url);
                fetch(event.request)  
            }
        }) 
    );



})





self.addEventListener('message', function(event){
    console.log("SW Received Message: " + event.data);
});


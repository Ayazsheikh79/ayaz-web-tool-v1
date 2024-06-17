const providers = [
    { provider: '123RF premium', price: 0.35, image: 'https://assets-cdn.123rf.com/index/static/assets/123rf-logo-blackbg.jpg', url: 'https://www.123rf.com/'},

    { provider: 'Artlist Music', price: 0.05, path: '/artlist-music', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ61AcQ3S7yYjYGw_dDyXv7y3mSYrZJeIPFvQ&s', url: 'https://artlist.io/royalty-free-music/'},

    { provider: 'Artlist Footage', price: 0.05,path: '/artlist-footage', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ61AcQ3S7yYjYGw_dDyXv7y3mSYrZJeIPFvQ&s', url: 'https://artlist.io/stock-footage/'},

    { provider: 'Artlist Sound Effects', price: 0.05, path: '/artlist-sfx', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ61AcQ3S7yYjYGw_dDyXv7y3mSYrZJeIPFvQ&s', url: 'https://artlist.io/sfx/'},

    { provider: 'Artlist Video Templates', price: 0.05, path: '/artlist-templates', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ61AcQ3S7yYjYGw_dDyXv7y3mSYrZJeIPFvQ&s', url: 'https://artlist.io/video-templates/'},

    {provider: 'Artgrid', price: 0.5, path: '/artgrid', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToCzYIw30n0l1WyhB2iDE3aeH3NrOKuoofGg&s', url: 'https://artgrid.io/'},

    { provider: 'Creative Fabrica', price: 0.10, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIYhVkr4q9QuA5NO0tk_dZkzdBONwblw2yAw&s', url: 'https://www.creativefabrica.com/'},

    { provider: 'Dreamstime', price: 0.35, image: 'https://thumbs.dreamstime.com/b/dreamstime-generic-image-test-logo-116954032.jpg', url: 'https://www.dreamstime.com/'},

    { provider: 'Epidemicsound', price: 0.30, image: 'https://www.epidemicsound.com/blog/content/images/2020/06/Artboard-1.png', url: 'https://www.epidemicsound.com/'},

    { provider: 'Iconscout', price: 0.2, image: 'https://iconscout.com/iconscout_logo-1024x1024.png', url: 'https://iconscout.com/'},

    { provider: 'iStockphoto', price: 0.45, image: 'https://www.brandemia.org/wp-content/uploads/2013/09/istock_logo_principal.jpg', url: 'https://www.istockphoto.com/'},

    { provider: 'Lovepik', price: 0.10, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi3M9mnuQYjHq_-GeuUtDzalSq0_wQS9vNPA&s', url: 'https://lovepik.com/'},

    { provider: 'Motionarray', price: 0.20, image: 'https://motionarray.com/assets/images/shared/logo--cyan_2x.png?v=1', url: 'https://motionarray.com/'},

    { provider: 'Motionelements', price: 0.30, image: 'https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/nzsmqsngakeaz7beagui', url: 'https://www.motionelements.com/'},

    { provider: 'Pikbest', price: 0.1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy2tBt7GivgWGP7eqBAI8_tuX2uqM8yBzpTg&s', url: 'https://pikbest.com/'},

    { provider: 'Pixelsquid', price: 0.30, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScNOp7QKm3dWzhjhRxXe5cbBfZYlNgoxtl6g&s', url: 'https://www.pixelsquid.com/'},

    { provider: 'PNGTree', price: 0.20, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShIis3kt_oWq-utGwqWJnKHIbqLEaXS-RTeg&s', url: 'https://pngtree.com/'},

    { provider: 'Rawpixel', price: 0.2, image: 'https://static2.rawpixel.com/_next/static/images/rawpixel-full-logo-bba5385d5887cbc6cf7d6b3b7d8231db.svg', url: 'https://www.rawpixel.com/'},

    { provider: 'Shutterstock', price: 0.30, image: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', url: 'https://www.shutterstock.com/image-'},

    { provider: 'Shutterstock Video 4K', price: 14, image: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', url: 'https://www.shutterstock.com/video/'},

    { provider: 'Shutterstock Video HD', price: 11, image: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', url: 'https://www.shutterstock.com/video/'},

    { provider: 'Shutterstock Video HD Select', price: 14, image: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', url: 'https://www.shutterstock.com/video/'},

    { provider: 'Shutterstock Video 4K Select', price: 18, image: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', url: 'https://www.shutterstock.com/video/'},

    { provider: 'Soundstripe', price: 0.07, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0DXWLgpIkP4BcXZ9wWcLrFYE1oZfAi5ftfg&s', url: 'https://app.soundstripe.com/'},

    { provider: 'Storyblocks', price: 0.4, image: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_3a2839e73306934898d3bcccf2c3aed4/storyblocks.png', url: 'https://www.storyblocks.com/'},

    { provider: 'Vecteezy', price: 0.15, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Vecteezy_logo.svg/2044px-Vecteezy_logo.svg.png', url: 'https://www.vecteezy.com/'},

    {provider: 'Envato ELements', price: 0.5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuA7ZTMWmVQhL_qZE7Z750dpoQKTSETbbwZw&s', url: 'https://elements.envato.com/'},

    {provider: 'AdobeStock', price: 0.1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAr11v9dc5tnsgTHkkzkD62Sb6JnO8xs3ppA&s', url: 'https://stock.adobe.com/images/'},

    {provider: 'AdobeStock HD', price: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAr11v9dc5tnsgTHkkzkD62Sb6JnO8xs3ppA&s', url: 'https://stock.adobe.com/video/'},

    {provider: 'AdobeStock 4K', price: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAr11v9dc5tnsgTHkkzkD62Sb6JnO8xs3ppA&s', url: 'https://stock.adobe.com/video/'},

    {provider: 'FreePik', price: 0.08, image: 'https://i.pinimg.com/736x/d3/49/36/d349363dc3c7297aa97363e6ec641d9d.jpg', url: 'https://www.freepik.com/'},

    {provider: 'Pixeden', price: 0.05, image: 'https://pbs.twimg.com/profile_images/1659539470285242368/qHs_dkas_400x400.png', url: 'https://www.pixeden.com/'},

    {provider: 'Brandpacks', price: 0.2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrp-w6eIzvL_fC9F9FV6_OrlSa-gd10bgQTw&s', url: 'https://brandpacks.com/'},

    {provider: 'Deeezy', price: 0.5, image: 'https://deeezy.com/img/fb-thumb.jpg', url: 'https://deeezy.com/'},

    {provider: 'Footagecrate', price: 0.3, image: 'https://yt3.googleusercontent.com/zIYIJliEkaqvMzG6e6sTVq0IXDpYg40QWYGPuuAnyMXJfrIH-zq9ytefWsSf-84O3yoasxMTZA=s900-c-k-c0x00ffffff-no-rj', url: 'https://footagecrate.com/'},

    {provider: 'Vectorstock', price: 1.5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOovVPD9mQlbV2_RnGojKWEN2gl7V84l3v0w&s', url: 'https://www.vectorstock.com/'},

];

export default providers;
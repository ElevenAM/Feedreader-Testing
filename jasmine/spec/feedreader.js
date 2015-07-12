/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a url', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){
        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('is visible when clicked', function() {
            //Set the visible and hide status of the menuIcon.
            var _visible = body.attr('class'),
                _hide;

            //toggle 'menu-hidden' status
            if(body.hasClass('menu-hidden') == true){
                _hide = '';
            }else{
                _hide = 'menu-hidden';
            }

            //Track down the menuIcon click
            menuIcon.click();
            expect(body.attr('class')).toBe(_hide);

            menuIcon.click();
            expect(body.attr('class')).toBe(_visible);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        //Jasmines beforeEach function for making asynchronous activities
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            })
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // I pass the done() function through here because I want to run this test
        it('can load entries', function(done){
            var numOfRows = $('.entry').length;
            expect(numOfRows).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        var entryTexts;

    // Store the content of the initial screen then load the new feed.
        beforeEach(function(done) {
            entryTexts = $('.feed').find('h2').text();
            loadFeed(1, done);
        });
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('changes the content when new content is loaded',function(done){
        //Using the 'h2' tag to grab seems to work much better than .innerText
            expect($('.feed').find('h2').text()).not.toBe(entryTexts);
            done();
        });

    // Go back to initial feed when finished
        afterEach(function(done) {
            loadFeed(0, done);
        });
    });
}());

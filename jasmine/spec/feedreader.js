/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

var complete;

//log the Critical Rendering Path to measure page load speed
//Normally I'd put this in the main.js file but I'll put this here for clarity
function logCRP() {
    var t = window.performance.timing;
    var dcl = t.domContentLoadedEventStart - t.domLoading;
    var complete = t.domComplete - t.domLoading;
}

window.addEventListener("load", function() {
  logCRP();
});


$(function() {
//Test Suite for the page itself
    describe('Page', function() {
        //Made up a new test to test page load speed. A feedreader should load quickly!
        it('loads quickly', function() {
            expect(complete).not.toBeGreaterThan(1);
        });
    });

//Test Suite for RSS Feeds
    describe('RSS Feeds', function() {

        //Test to ensure the feed variable is defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Test to make sure each feed has a url
        it('have a url', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        //Test to make sure each feed has a name
        it('have a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    //Test suite fore the menu
    describe('The menu', function(){
        var body = $('body');
        var menuIcon = $('.menu-icon-link');

         //Test ensuring that the menu is hidden by default
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

          //Test to make sure that the menu changes visibility when clicked
        it('is visible when clicked', function() {
            //Makes sure the initial state is hidden and sets variables
            body.removeClass();
            body.addClass('menu-hidden');
            var visibility = body.attr('class');
            var hiding = 'menu-hidden';

            //Track down the menuIcon click and make sure menu is visible on first click
            menuIcon.click();
            expect(body.attr('class')).not.toBe(hiding);

            //Second menuIcon click to make menu hidden on second click
            menuIcon.click();
            expect(body.attr('class')).toBe(hiding);
        });
    });

    //Test suite for Initial Entries
    describe('Initial Entries', function(){

        //Jasmines beforeEach function for making asynchronous activities
        beforeEach(function(done) {
            loadFeed(0, done);
        });

         //Test that makes sure loadFeed can load at least one .entry element in the .feed
        it('can load entries', function(){
            var numOfRows = $('.entry').length;
            expect(numOfRows).toBeGreaterThan(0);
        });
    });

    //Test Suite for Feed Selection
    describe('New Feed Selection', function(){
        var entryTexts;

    // Store the content of the initial screen then load the new feed.
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, done);
            entryTexts = $('.feed').find('h2').text();
            loadFeed(1, done);
        });

        //Test ensuring content is changed when new feed is loaded by loadFeed()
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

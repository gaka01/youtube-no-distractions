// ==UserScript==
// @name         YouTube - no distractions script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove distractions from youtube. Redirect from Home and Trending to Subscriptions
// @author       Galin
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let BAD_PATHS = [ //will redirect to /feed/subscriptions is you land on this path
        '/',
        '/trending',
    ];

    let SELECTORS_TO_HIDE = [
        '#guide-button', //menu button
        '#logo', //logo
        '[role="navigation"]', //side menus
        '#columns>#secondary', //suggested videos (right column in general)
        '#comments', //comments
        '.videowall-endscreen', //video wall at end of video
        '.ytp-next-button', //play next button
        '#chat', //chat
        '#related', //suggested videos (small screen)
        '#info.ytd-video-primary-info-renderer', //view count, etc
        '#owner-sub-count', //sub count
        '#container > ytd-expander > ytd-metadata-row-container-renderer', //related topics (boxes on bottom of description)
        '#sponsor-button', //Join button
        '#thumbnail > #hover-overlays', //hover buttons (watch later etc)
        'button[data-tooltip-target-id="ytp-autonav-toggle-button"]', // autoplay button
        'button.playerButton#infoButton', //sponsorblock info
        '.badge-style-type-verified', //verified badge
        '.super-title', //tags, other shit above title
        '#clarify-box', //covid warning
    ];

    if(BAD_PATHS.includes(window.location.pathname)) {
        window.location.href = "https://www.youtube.com/feed/subscriptions";
    }

    addGlobalStyle(SELECTORS_TO_HIDE.join(', ') + ' { display: none; }');

    addGlobalStyle("#header, ytd-playlist-sidebar-renderer.ytd-browse {left: 0; }");
    addGlobalStyle('#page-manager { margin-left: 0; }');

    addGlobalStyle('#metadata > * { display: none; }');
    addGlobalStyle('#metadata > #byline-container { display: initial; }');
    addGlobalStyle('#video-title { max-height: none; -webkit-line-clamp: unset; }');






    function addGlobalStyle(css) {
        let head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css.replace(/;/g, ' !important;');
        head.appendChild(style);
    }


    //mutation observer
    //let childListMutationHandlers = [
    //    (mutation, observer) => {
    //        mutation.addedNodes.forEach((node) => {
    //            if (node instanceof Element &&
    //                node.matches('#movie_player') &&
    //                node.parentElement.matches('#container')) {
//
    //                if (!hasParent(node, "#player-theater-container")) {
    //                    setTimeout(() => {document.querySelector('.ytp-size-button').click()}, 2000);
    //                    //document.querySelector('.ytp-size-button').click();
    //                }
    //            }
    //        });
    //    },
//
    //];
//
    //let attributeMutationHandlers = [];
//
    //const mainObserver = observerFactory(document.getElementsByTagName('html')[0], (mutation, observer) => {
    //    if (mutation.type === 'childList') {
    //        for(const handler of childListMutationHandlers) {
    //            handler(mutation, observer);
    //        }
    //    }
    //    else if (mutation.type === 'attributes') {
    //        for(const handler of attributeMutationHandlers) {
    //            handler(mutation, observer);
    //        }
    //    }
    //});

    //function observerFactory(element, callback) {
    //    const observerConfig = { attributes: true, childList: true, subtree: true };
    //    const observer = new MutationObserver((mutationList, observer) => {
    //        mutationList.forEach(mutation => {
    //            if(callback(mutation, observer)) {
    //                observer.disconnect();
    //            }
    //        });
    //    });
//
    //    observer.observe(element, observerConfig);
    //    return observer;
    //}
//
    //function hasParent(element, parentSelector) {
    //    if (element.parentElement instanceof Element) {
    //        if(element.parentElement.matches(parentSelector)) {
    //           return true;
    //        } else {
    //            return hasParent(element.parentElement, parentSelector);
    //        }
    //    }
//
    //    return false;
    //}

})();

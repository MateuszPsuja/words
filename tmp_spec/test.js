// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting, } from '@angular/platform-browser-dynamic/testing';
import './app/app.component.spec';
if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
        console.error('Global error from test bootstrap:', event?.error ?? event?.message);
    });
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled rejection from test bootstrap:', event?.reason);
    });
}
// Prevent Karma from running prematurely.
__karma__.loaded = function () { };
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false },
});
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
//# sourceMappingURL=test.js.map
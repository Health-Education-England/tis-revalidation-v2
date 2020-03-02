import { TestBed, async } from '@angular/core/testing';
import { HotJarModule, HotJarConfig } from './hotjar.module';
import { RouterTestingModule } from "@angular/router/testing";
import { Router, Routes } from "@angular/router";
import { Location } from "@angular/common";

/**
 * MOCK DUMMY COMPONENT
 */
import { Component } from '@angular/core';

@Component({
    selector: 'app-mock',
    template: `Mock`
})
export class MockComponent { }

@Component({
    template: `<router-outlet></router-outlet>`
})
export class AppComponent { }

export const routes: Routes = [
    { path: '', redirectTo: 'mock', pathMatch: 'full' },
    { path: 'mock', component: MockComponent }
];

describe('MockComponent', () => {
    let location: Location;
    let router: Router;
    let fixture: any;
    const hotJarConfig: HotJarConfig = { hotJarId: 1, hotJarSv: 2, enabled: true };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                HotJarModule.forRoot(hotJarConfig)
            ],
            declarations: [
                AppComponent, MockComponent
            ],
        }).compileComponents();

        router = TestBed.get(Router);
        location = TestBed.get(Location);

        fixture = TestBed.createComponent(AppComponent);

        fixture.ngZone.run(() => {
            router.initialNavigation();
        });
    }));

    it('should create the mock component', () => {
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    describe('HotJar Module loader tests', () => {
        let docHead: HTMLHeadElement;
        let scriptTag: HTMLScriptElement;
        let scriptSrc: string;
        let asyncTag: boolean;

        beforeEach(() => {
            docHead = fixture.debugElement.nativeNode.ownerDocument.head;
            scriptTag = docHead.querySelector('script[src^="https://static.hotjar.com"]');
            scriptSrc = scriptTag.getAttribute('src');
            asyncTag = scriptTag.hasAttribute('async');
        });

        it('header tag should contain the script tag', () => {
            expect(scriptTag).toBeTruthy();
        });

        it('script tag should contain the injected hotJarId', () => {
            expect(scriptSrc).toContain(`hotjar-${hotJarConfig.hotJarId}.js`);
        });

        it('script tag should contain the injected hotJarVersion', () => {
            expect(scriptSrc).toContain(`?sv=${hotJarConfig.hotJarSv}`);
        });

        it('script tag should contain the async attribute ', () => {
            expect(asyncTag).toBeTrue();
        });
    });

});

import { TestBed, waitForAsync } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
describe('LogoComponent', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LogoComponent],
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(LogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=logo.component.spec.js.map
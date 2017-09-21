import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcMenuComponent, MdcMenuModule } from '../../../src/lib/public_api';

describe('MdcMenuComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcMenuModule],
      declarations: [
        SimpleTest,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcMenuComponent;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcMenuComponent));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-simple-menu by default', () => {
      expect(testDebugElement.nativeElement.classList)
        .toContain('mdc-simple-menu', 'Expected to have mdc-simple-menu');
    });

    it('#should be closed', () => {
      testInstance.close();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(false);
    });

    it('#should be open', () => {
      testInstance.open();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(true);
    });

    it('#should be open with focus to index 2', () => {
      testInstance.open(2);
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(true);
    });

    it('#should be open from bottom right', () => {
      testComponent.myOpenFrom = 'bottom-right';
      testInstance.open();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(true);
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <div mdc-menu-anchor>
      <mdc-menu #menu [openFrom]="myOpenFrom">
        <mdc-menu-item [id]="0">Item 1</mdc-menu-item>
        <mdc-menu-item [id]="1" [disabled]="isDisabled">Item 2</mdc-menu-item>
        <mdc-menu-item [id]="2">Item 3</mdc-menu-item>
        <mdc-menu-divider></mdc-menu-divider>
        <mdc-menu-item [id]="3">Item 4</mdc-menu-item>
      </mdc-menu>
    </div>
  `,
})
class SimpleTest {
  myOpenFrom: string = 'topLeft';
  isDisabled: boolean = true;
}

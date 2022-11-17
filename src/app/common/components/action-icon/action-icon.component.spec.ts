import { Component, ElementRef, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {ActionIconComponent} from "./action-icon.component";
import {IconSpriteModule} from 'ng-svg-icon-sprite';

describe('AcationIconComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        ActionIconComponent
      ],
      imports: [IconSpriteModule]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component.actionIconComponent).toBeDefined();
  });

  it('should display icon', () => {
    expect(component.actionIconElementRef.nativeElement.querySelector('svg-icon-sprite')).toBeDefined();
  });

  it('should have inner text', () => {
    expect(component.actionIconElementRef.nativeElement.querySelector('.icon-title').innerHTML.trim())
      .toBe(component.mockButtonText);
  });

  it('should call emit clicks', () => {
    jest.spyOn(component, 'onClick');
    component.actionIconElementRef.nativeElement.click();
    expect(component.onClick).toHaveBeenCalled();
  });
});

@Component({
  template: `
    <button app-action-icon
      [iconName]="'trash'"
      [title]="mockButtonText"
      (click)="onClick()">
    </button>
  `
})
class TestHostComponent {
  @ViewChild(ActionIconComponent) actionIconComponent: ActionIconComponent;
  @ViewChild(ActionIconComponent, {read: ElementRef}) actionIconElementRef: ElementRef<HTMLButtonElement>;

  mockButtonText = 'Mock text';

  onClick() {}
}
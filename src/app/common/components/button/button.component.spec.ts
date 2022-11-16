import { Component, ElementRef, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button.component";

describe('ButtonComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        ButtonComponent
      ]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component.buttonComponent).toBeDefined();
  });

  it('should have inner text', () => {
    expect(component.buttonElementRef.nativeElement.innerHTML.trim())
      .toBe(component.mockButtonText);
  });

  it('should call emit clicks', () => {
    jest.spyOn(component, 'onClick');
    component.buttonElementRef.nativeElement.click();
    expect(component.onClick).toHaveBeenCalled();
  });
});

@Component({
  template: `
    <button app-button-primary
      (click)="onClick()">
      {{mockButtonText}}
    </button>
  `
})
class TestHostComponent {
  @ViewChild(ButtonComponent) buttonComponent: ButtonComponent;
  @ViewChild(ButtonComponent, {read: ElementRef}) buttonElementRef: ElementRef<HTMLButtonElement>;

  mockButtonText = 'Mock text';

  onClick() {}
}

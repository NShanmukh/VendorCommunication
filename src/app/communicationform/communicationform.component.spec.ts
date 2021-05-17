import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationformComponent } from './communicationform.component';

describe('CommunicationformComponent', () => {
  let component: CommunicationformComponent;
  let fixture: ComponentFixture<CommunicationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

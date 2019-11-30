import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransIntermediairePage } from './trans-intermediaire.page';

describe('TransIntermediairePage', () => {
  let component: TransIntermediairePage;
  let fixture: ComponentFixture<TransIntermediairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransIntermediairePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransIntermediairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

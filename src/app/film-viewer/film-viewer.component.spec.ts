import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsViewerComponent } from './film-viewer.component';

describe('FilmsViewerComponent', () => {
  let component: FilmsViewerComponent;
  let fixture: ComponentFixture<FilmsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmsViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

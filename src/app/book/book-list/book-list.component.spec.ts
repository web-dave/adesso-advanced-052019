import { RouterTestingModule } from '@angular/router/testing';
import { BookStaticAsyncDataService } from './../shared/book-static-async-data.service';
import { BookDataService } from '../shared/book-data.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';

import { staticBookData } from '../shared/book-static-data.service';
fdescribe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let compiled;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: BookDataService,
          useClass: BookStaticAsyncDataService
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    // create component and detect changes
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should recieve 3 Books', () => {
    expect(compiled.querySelectorAll('.book-row').length).toBe(3);
  });

  it('should display the title of each book', () => {
    const rows = compiled.querySelectorAll('.book-row');
    [0, 1, 2].forEach(i => {
      const book = rows[i];
      expect(book.querySelector('a').innerText).toBe(staticBookData[i].title);
    });
  });

  it('should link to the edit page of each book', () => {
    const rows = compiled.querySelectorAll('.book-row');
    [0, 1, 2].forEach(i => {
      const book = rows[i];
      expect(book.querySelector('a').href).toContain(staticBookData[i].isbn);
    });
  });
});

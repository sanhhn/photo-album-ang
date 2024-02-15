import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { PhotoAlbumService } from 'src/app/services/photo-album-service';
import { PhotoAlbumComponent } from './photo-album.component';

describe('PhotoAlbumComponent', () => {
  let component: PhotoAlbumComponent;
  let fixture: ComponentFixture<PhotoAlbumComponent>;
  let photoService: PhotoAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoAlbumComponent],
      imports: [HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule, MatTableModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressBarModule],
      providers: [MatDialog, PhotoAlbumService],
    });
    fixture = TestBed.createComponent(PhotoAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoAlbumComponent);
    component = fixture.componentInstance;
    photoService = TestBed.inject(PhotoAlbumService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load photos when ngOnInit is called', () => {
    const mockPhotos = [
      { albumId: 3, id: 101, title: 'incidunt alias vel enim' },
      { albumId: 3, id: 102, title: 'eaque iste corporis tempora vero distinctio consequuntur nisi nesciunt' },
      { albumId: 3, id: 103, title: 'et eius nisi in ut reprehenderit labore eum' },
    ];

    spyOn(photoService, 'getPhotosAlbum').and.returnValue(of(mockPhotos));

    component.ngOnInit();

    expect(photoService.getPhotosAlbum).toHaveBeenCalledWith(3);
    expect(component.dataSource.data).toEqual(mockPhotos);
  });

});

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Photo } from 'src/app/models/photo.model';
import { PhotoAlbumService } from 'src/app/services/photo-album-service';

@Component({
  selector: 'app-photo-album',
  templateUrl: './photo-album.component.html',
  styleUrls: ['./photo-album.component.scss']
})
export class PhotoAlbumComponent {
  private unsubscribe$ = new Subject<void>()
  
  displayedColumns: string[] = ['id', 'title', 'thumbnailUrl'];
  dataSource: MatTableDataSource<Photo> = new MatTableDataSource<Photo>();
  albumId: number = 3;
  
  // loading progress
  loading: boolean = false;

  // view photo dialog data
  selectedPhoto!: Photo;
  
  // view photo dialog template
  @ViewChild('viewPhoto')
  private readonly viewPhoto!: TemplateRef<any>;
  viewPhotoRef: any

  @ViewChild("matSortComm") matSortComm: MatSort = new MatSort();
  @ViewChild("matPagComm")
  matPageComm!: MatPaginator;

  filterValue: string = ''

  constructor(private photoService: PhotoAlbumService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  // load photo
  loadPhotos(): void {
    this.loading = true;
    this.photoService.getPhotosAlbum(this.albumId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (photos: Photo[]) => {
          this.dataSource.data = photos;
          
          //test loading
          // setTimeout(() => {
          //   this.loading = false;
          // }, 5000);

          setTimeout(() => { 
            this.dataSource.sort = this.matSortComm;
            this.dataSource.paginator = this.matPageComm;
          },500);
          
          this.loading = false;
        }, 
        error: (err) => {
          console.log('error: ', err);
          this.loading = false;
        }
      });
  }

  // view  photo dialog
  onViewPhoto(photo: Photo) {

    this.selectedPhoto = photo;

    this.viewPhotoRef = this.dialog.open(this.viewPhoto, {
      closeOnNavigation: true,
      autoFocus: false,
    })
  }

  // close view photo dialog
  onDialogClose() {
    if( this.viewPhotoRef) this.viewPhotoRef.close();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // apply filter on table
  applyFilter(term: Event){
    //this.filterValue = (term.target as HTMLInputElement).value;
    // console.log('check filter: ', this.filterValue);
    this.dataSource.filterPredicate != this.filterPredicate ? this.dataSource.filterPredicate = this.filterPredicate : "";
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  filterPredicate = (data: Photo, filter: string): boolean => {
    var output: boolean = false;
    try{
      if((data.id +'').includes(filter.toLowerCase())){
        output = true;
      }
      if((data.title + '').toLowerCase().includes(filter.toLowerCase())){
        output = true;
      }
    }
    catch(e){

    }
    return output;
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from '../../book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @Input() book: any;
  @Output() closeEdit = new EventEmitter<void>();
  
  constructor(private bookService: BookService, private toastr: ToastrService) {}
  updateBook(): void {
    const bookDTO = {
      isbn: this.book.isbn,
      title: this.book.title,
      author: this.book.author,
      genre: this.book.genre,
      price: this.book.price,
      availableCopies: this.book.availableCopies,
      publisher: this.book.publisher,
      publishedYear: this.book.publishedYear,
    };

    this.bookService.updateBook(this.book.id, bookDTO).subscribe(
      (response) => {
        console.log('Book updated successfully:', response);
        this.toastr.success('Book updated successfully!', 'Success');
        this.closeEdit.emit();
      },
      (error) => {
        console.error('Error updating book:', error);
        this.toastr.error('Failed to update the book.', 'Error');
      }
    );
  }
  cancelEdit() {
    this.closeEdit.emit();
  }
}

import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('name') ingName: ElementRef;
  // @ViewChild('amount') ingAmount: ElementRef;

  ingSubs: Subscription;
  editedItemIndex: number;
  editMode = false;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingSubs = this.slService.editingStarted.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(this.editedItemIndex);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(f: NgForm): void{
    const value = f.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, ingredient);
    }else{
      this.slService.addIngredient(ingredient);
    }

    this.editMode = false;
    f.resetForm();
  }

  onClear(): void{
    this.slForm.resetForm();
    this.editMode = false;
  }

  onDelete(): void{
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void{
    this.ingSubs.unsubscribe();
  }

}

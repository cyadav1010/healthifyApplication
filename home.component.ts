import { Component, OnInit } from '@angular/core';
import { InputData } from '../../model/input.model';
import { Supplement } from '../../model/supplement.model';
import { Sex } from '../../model/sex.model';
import { DailyActivity } from '../../model/daily-activity.model';
import { Food } from '../../model/food.model';
import { SupplementNeeded } from '../../model/supplement-needed.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public inputData = new InputData();
  public supplement = new Supplement();
  public supplementNeeded = new SupplementNeeded();
  public InputPage: boolean;
  public Info: boolean;
  public supplementNeededPage: boolean;
  public addFoodPage: boolean;
  public mealType: boolean;
  public bmi: number;
  public dataPageInfo: boolean;
  public foodList1: Food[];
  sexSelected: string;
  dailyActivitySelected: string;
  selectedFood: Food;

  constructor() { }
  public sex: Sex[] = [{ name: 'male' }, { name: 'female' }];
  public dailyActivity: DailyActivity[] = [{ activityName: 'Lightly Active', descName: 'Light exercise' }, { activityName: 'Moderate Active', descName: 'Sports 3-5 days' }, { activityName: 'very active', descName:'Hard exercise or sport 6-7 days' }];
  ngOnInit() {
    this.InputPage = true;
    this.Info = false;
    this.supplementNeededPage = false;
    this.addFoodPage = false;
    this.mealType = false;
    this.dataPageInfo = false;
  }
  onclick(inputData) {
    this.dataPageInfo = true;
    //this.addFoodPage = true;
    this.mealType = true;
    this.calculateBMI();
    //this.inputData.height=iputData.
    this.InputPage = false;
    console.log(this.sexSelected);
    console.log(this.dailyActivitySelected);
  }
  public calculateBMI() {
    let height = this.inputData.height * (0.3);
    height = height * height;
    console.log("height"+height);
    let weight = this.inputData.weight;
    console.log("weight"+weight);
    this.bmi = weight / height;
    console.log("bmi " + this.bmi);
    this.Info = true;
    this.supplement.protein = Math.round(weight * (.8));
    this.supplement.carbs = weight * (7);
    if (this.sexSelected == 'female')
      this.supplement.calories = 2000;
    else
      this.supplement.calories = 2500;

    if (this.dailyActivitySelected == 'Light exercise') {
      this.supplement.protein += 5;
      this.supplement.calories += 100;
      this.supplement.carbs += 10;
    }

    if (this.dailyActivitySelected == 'Moderate Active') {
      this.supplement.protein += 10;
      this.supplement.calories += 200;
      this.supplement.carbs += 10;
    }

    if (this.dailyActivitySelected == 'very active') {
      this.supplement.protein += 15;
      this.supplement.calories += 300;
      this.supplement.carbs += 15;
    }

    if (this.dailyActivitySelected == 'Hard exercise or sport 6-7 days') {
      this.supplement.protein += 20;
      this.supplement.calories += 500;
      this.supplement.carbs += 25;
    }
    console.log("protein" + this.supplement.protein);
  }

  public calculateInputData() {

  }

  public onSelectFood(food: Food):void {
    this.selectedFood = food;
    this.Info = false;
    //console.log("onselectFood" , food);
  }
  public foodList: Food[] = [
    { id: 1, name: 'egg', quantity: 1, protein: 8, carbs: 8, calories: 50 },
    { id: 1, name: 'banana', quantity: 1, protein: 5, carbs: 7, calories: 45 },
    { id: 1, name: 'milk', quantity: 1, protein: 10, carbs: 4, calories: 30 },
    { id: 1, name: 'apple', quantity: 1, protein: 1, carbs: 7, calories: 40 },
    { id: 1, name: 'bread', quantity: 1, protein: 5, carbs: 6, calories: 50 }
  ]

  
  public supplementNeed() {
    this.supplementNeeded.protein = this.supplement.protein
    this.supplementNeeded.calories = this.supplement.calories;
    this.supplementNeeded.carbs = this.supplement.carbs;
  }

  public updateSupplement(selectedFood: Food) {
    this.supplementNeededPage = true;
    console.log("selectedFood ");
    console.log(selectedFood);
    let protein = selectedFood.protein*selectedFood.quantity;
    let carbs = selectedFood.carbs*selectedFood.quantity;
    let calories = selectedFood.calories*selectedFood.quantity;
    this.supplementNeed();
    this.Info = false;
    if (this.supplementNeeded.protein > 0) {
      this.supplementNeeded.protein = this.supplementNeeded.protein - protein;
    }
    if (this.supplementNeeded.carbs > 0) {
      this.supplementNeeded.carbs = this.supplementNeeded.carbs - carbs;
    }
    if (this.supplementNeeded.calories > 0) {
      this.supplementNeeded.calories = this.supplementNeeded.calories - calories;
    }
    this.selectedFood = null;
  }

  public addMeal(mealType: string) {
    this.addFoodPage = true;
    console.log(mealType);
    if (mealType == 'breakfast') {

      this.foodList1=[
        { id: 1, name: 'egg', quantity: 1, protein: 8, carbs: 8, calories: 50 },
        { id: 1, name: 'banana', quantity: 1, protein: 5, carbs: 7, calories: 45 },
        { id: 1, name: 'milk', quantity: 1, protein: 10, carbs: 4, calories: 30 },
        { id: 1, name: 'apple', quantity: 1, protein: 1, carbs: 7, calories: 40 },
        { id: 1, name: 'bread', quantity: 1, protein: 5, carbs: 6, calories: 50 }
      ]
   }
    if (mealType == 'luch') {
      this.foodList1 = [
        { id: 1, name: 'rice', quantity: 1, protein: 8, carbs: 8, calories: 50 },
        { id: 1, name: 'chapati', quantity: 1, protein: 5, carbs: 7, calories: 45 },
        { id: 1, name: 'dal', quantity: 1, protein: 10, carbs: 4, calories: 30 },
        { id: 1, name: 'juice', quantity: 1, protein: 1, carbs: 7, calories: 40 },
        { id: 1, name: 'Vegetable', quantity: 1, protein: 1, carbs: 7, calories: 40 }
      ]
    }
    if (mealType == 'dinner') {
      this.foodList1 = [
        { id: 1, name: 'chapati', quantity: 1, protein: 8, carbs: 8, calories: 50 },
        { id: 1, name: 'bread', quantity: 1, protein: 5, carbs: 7, calories: 45 },
        { id: 1, name: 'milk', quantity: 1, protein: 10, carbs: 4, calories: 30 },
        { id: 1, name: 'dosa', quantity: 1, protein: 1, carbs: 7, calories: 40 },
        { id: 1, name: 'salad', quantity: 1, protein: 1, carbs: 7, calories: 40 }
     ]
   }

  }
  public bmiCalculator() {
    let weight = this.inputData.weight;
    let height = this.inputData.height * (0.0254);
    height = height * height;
    let bmi = weight / height;
    console.log("bmi" + bmi);
    if (bmi < 25 && bmi > 19) {
      console.log("you are healthy ");
    }
  }
};

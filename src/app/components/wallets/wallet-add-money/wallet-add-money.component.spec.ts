import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAddMoneyComponent } from './wallet-add-money.component';

describe('WalletAddMoneyComponent', () => {
  let component: WalletAddMoneyComponent;
  let fixture: ComponentFixture<WalletAddMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletAddMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletAddMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

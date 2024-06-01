import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaAnimalesTratadosPage } from './lista-animales-tratados.page';

describe('ListaAnimalesTratadosPage', () => {
  let component: ListaAnimalesTratadosPage;
  let fixture: ComponentFixture<ListaAnimalesTratadosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAnimalesTratadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAnimalesTratadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

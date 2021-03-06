/*!
 * @license
 * Copyright 2019 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Input, OnChanges } from '@angular/core';
import { CardViewSelectItemModel } from '../../models/card-view-selectitem.model';
import { CardViewUpdateService } from '../../services/card-view-update.service';
import { Observable } from 'rxjs';
import { CardViewSelectItemOption } from '../../interfaces/card-view.interfaces';
import { MatSelectChange } from '@angular/material';
import { BaseCardView } from '../base-card-view';

@Component({
    selector: 'adf-card-view-selectitem',
    templateUrl: './card-view-selectitem.component.html',
    styleUrls: ['./card-view-selectitem.component.scss']
})
export class CardViewSelectItemComponent extends BaseCardView<CardViewSelectItemModel<string>> implements OnChanges {

    @Input() editable: boolean = false;

    @Input() options$: Observable<CardViewSelectItemOption<string>[]>;

    @Input()
    displayNoneOption: boolean = true;

    value: string;

    constructor(cardViewUpdateService: CardViewUpdateService) {
        super(cardViewUpdateService);
    }

    ngOnChanges(): void {
        this.value = this.property.value;
    }

    isEditable(): boolean {
        return this.editable && this.property.editable;
    }

    getOptions(): Observable<CardViewSelectItemOption<string>[]> {
        return this.options$ || this.property.options$;
    }

    onChange(event: MatSelectChange): void {
        const selectedOption = event.value !== undefined ? event.value : null;
        this.cardViewUpdateService.update(<CardViewSelectItemModel<string>> { ...this.property }, selectedOption);
        this.property.value = selectedOption;
    }

    showNoneOption() {
        return this.displayNoneOption;
    }
}

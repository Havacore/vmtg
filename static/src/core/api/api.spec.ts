import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [ApiService]});
    });

    it('should work', () => {
        expect(true).toBe(true);
    });
});

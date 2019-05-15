import { IDatasource } from './datasource.interface';
import { ViewChild, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { componentDestroyed } from '../utils/component-destroyed';
import { PageQueryModel } from '@redux/shared/models/page-query.model';

export abstract class ListComponentBase<T, D = any> implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    subscriptionList: Subscription;

    dataSource: IDatasource<T, D>;

    filter = new BehaviorSubject<T>(<T>{});

    data = new BehaviorSubject<T>(<T>{});

    @Input()
    size = 10;

    constructor(datasource: IDatasource<T>) {
        this.dataSource = datasource;
    }

    ngOnInit(): void {
        this.loadDataSource();
    }

    protected loadDataSource() {
        this.subscriptionList && this.subscriptionList.unsubscribe();
        this.subscriptionList = this.dataSource.load(
            this._buildPageQuery(),
            this.getParams(),
            this._hasNextPage(),
            this.filter.getValue()
        ).pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe();
    }

    ngAfterViewInit(): void {
        this.paginator.page.pipe(
            takeUntil(componentDestroyed(this)),
            tap(() => this._loadPage())
        ).subscribe();
        this.dataSource.total$.pipe(
            takeUntil(componentDestroyed(this)),
            tap((total) => {
                const totalIndex = Math.ceil(total / this.paginator.pageSize) - 1;
                if (this.paginator.pageIndex > totalIndex) {
                    this.paginator.previousPage();
                }
            })
        ).subscribe();
    }

    protected _loadPage() {
        this.subscriptionList && this.subscriptionList.unsubscribe();
        this.subscriptionList = this.dataSource.load(this._buildPageQuery(),
            this.getParams(),
            this._hasNextPage(),
            this.filter.getValue()
        ).pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe();
    }

    protected _buildPageQuery() {
        const pageQuery = <PageQueryModel>{
            index: this.paginator.pageIndex,
            size: this.size
        };
        return pageQuery;
    }

    protected _hasNextPage() {
        return this.dataSource.total$.pipe(
            map(() => this.paginator ? this.paginator.hasNextPage() : false)
        );
    }

    getParams(): Observable<T> {
        return this.filter.asObservable();
    }

    ngOnDestroy() {
        this.paginator.ngOnDestroy();
    }
}

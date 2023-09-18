import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective,Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';

import {employeesData, employeesGrid } from '../Data/dummy';
import {Header} from '../Components'

const DerivativeNifty = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Derivatives" title="Nifty Option Chain" />

      <GridComponent
        dataSource={employeesData}
        allowPaging
        // allowSorting
        // toolbar={['Search']}
        width= 'auto'
        
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>

    </div>
  );
};
export default DerivativeNifty;
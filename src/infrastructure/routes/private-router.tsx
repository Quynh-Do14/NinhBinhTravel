import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isTokenStoraged } from '../utils/storage';
import { ROUTE_PATH } from '../../core/common/appRouter';

export const PrivateRoute = ({ component: RoutePath }: any) => {
    const storage = isTokenStoraged();

    if (storage) {
        return RoutePath
    }
    else {
        return <Navigate to={ROUTE_PATH.LOGIN} />
    }
}
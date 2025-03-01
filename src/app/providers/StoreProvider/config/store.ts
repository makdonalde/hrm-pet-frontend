import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userApi, userReducer } from '@/entities/User';
import { authApi } from '@/features/UserAuth/model/api/auth.api';
import { rtkQueryErrorLogger } from '@/shared/middlewares/error-toast.middleware';
import { courseApi } from '@/entities/Courses';
import { courseCategoryApi } from '@/entities/CourseCategory';
import { sidebarReducer } from '@/widgets/Sidebar';

export const store = configureStore({
    reducer: combineReducers({
        userReducer,
        sidebarReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [courseCategoryApi.reducerPath]: courseCategoryApi.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        authApi.middleware,
        userApi.middleware,
        courseApi.middleware,
        courseCategoryApi.middleware,
        rtkQueryErrorLogger,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

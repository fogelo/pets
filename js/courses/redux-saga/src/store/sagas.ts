import { getPosts, getUserPosts } from "../api/posts";
import {
  USER_POSTS_FETCH_FAILED,
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
} from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";

// saga - это сага вотчер, который слушает action и делегирует его другой функции
// takeEvery - это вспомогательная функция (helper), которая слушает определенное действие (action) и запускает saga-функцию для каждого такого экшена
export function* saga() {
  yield takeEvery(USER_POSTS_FETCH_REQUESTED, fetchUserPosts);
}

function* fetchUserPosts(action: any): Generator<any, void, any> {
  try {
    const posts = yield call(getUserPosts, action.payload.userId);
    yield put({ type: USER_POSTS_FETCH_SUCCEEDED, payload: { data: posts } });
  } catch (error) {
    yield put({
      type: USER_POSTS_FETCH_FAILED,
      payload: { message: error.message },
    });
  }
}

/* 
Здесь takeEvery делает следующее:

1. Слушает каждый экшен типа USER_POSTS_FETCH_REQUESTED
2.Запускает функцию fetchPosts каждый раз, когда такой экшен диспатчится
3. Не блокирует следующие вызовы - если экшен диспатчится несколько раз подряд, все вызовы будут обработаны параллельно
*/

/* 
Другие эффекты:
1. takeLatest - слушает только последний экшен и отменяет предыдущие вызовы
2. takeLeading - слушает только первый экшен и отменяет все последующие вызовы
3. takeEvery - слушает все экшены и запускает функцию для каждого экшена
4. put - отправляет экшен в store
5. call - эффект, который вызывает функцию и ожидает ее результат
6. all - эффект, который запускает несколько функций параллельно
6. fork - запускает функцию в фоновом режиме
7. join - ожидает завершения функции
8. cancel - отменяет функцию
9. select - выбирает данные из store
10. take - слушает экшен и ожидает его диспатч
11. takeMaybe - слушает экшен и ожидает его диспатч, но не блокирует следующие вызовы
12. takeMaybeLatest - слушает только последний экшен и отменяет предыдущие вызовы, но не блокирует следующие вызовы
13. takeMaybeLeading - слушает только первый экшен и отменяет все последующие вызовы, но не блокирует следующие вызовы
... и так далее

*/

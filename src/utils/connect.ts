import { UserData } from "../api/types";
import Block from "../core/Block";
import { State, StoreEvents } from "../core/Store";
import { Props } from "../core/types";
import { isEqual } from "./utils";

export function connect(
  mapStateToProps: (state: State) => Partial<State> | UserData[]
) {
  return function fn(Component: typeof Block) {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: Props) {
        const { store } = window;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        };

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}

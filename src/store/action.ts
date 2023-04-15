import Actions from '@/actions.json';
import Flat from '@maxswjeon/flattype';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ActionType = Record<
  string,
  | string
  | Record<string, string>
  | Record<string, Record<string, string>>
  | Record<string, Record<string, Record<string, string>>>
>;

type ActionState = {
  data: Flat;
  action?: keyof typeof Actions;
  mutations: {
    setAction: (action: keyof typeof Actions) => void;
    setValue: (key: string, value: string | object) => void;
    appendValue: (key: string) => void;
    clear: () => void;
  };
};

const actionToObject = (action: ActionType) => {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const data: any = {};

  for (const [key, value] of Object.entries(action)) {
    if (typeof value === 'string' && value.endsWith('[]')) {
      data[key] = [];
    } else if (typeof value === 'string') {
      data[key] = '';
    } else if (value.__array) {
      data[key] = [];
    } else {
      data[key] = actionToObject(value as unknown as ActionType);
    }
  }

  return data;
};

const store = devtools<ActionState>((set) => ({
  data: Flat.from({}),
  mutations: {
    setAction: (action: keyof typeof Actions) => {
      console.log(
        Flat.from(actionToObject(Actions[action] as unknown as ActionType))
      );

      set({
        action,
        data: Flat.from(
          actionToObject(Actions[action] as unknown as ActionType)
        ),
      });
    },
    setValue: (key, value) =>
      set((state) => ({ data: state.data.set(key, value) })),
    appendValue: (key) =>
      set((state) => {
        if (!state.action) {
          return state;
        }

        const action: ActionType = Actions[
          state.action
        ] as unknown as ActionType;

        if (!(key in action)) {
          return state;
        }

        const param = action[key];
        const paramIsArray =
          (typeof param === 'string' && param.endsWith('[]')) ||
          (typeof param === 'object' && '__array' in param && param.__array);

        if (!paramIsArray) {
          return state;
        }

        return state;
      }),
    clear: () => set(() => ({ data: Flat.from({}) })),
  },
}));

const useActionStore = create<ActionState>()(store);
export const useActionMutations = () =>
  useActionStore((state) => state.mutations);
export const useAction = () => useActionStore((state) => state.action);
export const useActionState = (key: string) => {
  const { setValue } = useActionMutations();
  const state = useActionStore((state) => state.data);
  return [
    state.get(key) as string,
    (value: string) => setValue(key, value),
  ] as [string, (value: string) => void];
};
export const useActionFull = <T>() => {
  const state = useActionStore((state) => state.data);
  return state.getData() as T;
};
export const useActionFlat = () => useActionStore((state) => state.data);
export const useActionType = (key: string) => {
  const action = useAction();
  if (!action) {
    return undefined;
  }

  const actionType = Actions[action];
  const actionKeyArray = key.split('__');
  console.log(actionKeyArray);

  if (actionKeyArray[actionKeyArray.length - 1].trim() === '') {
    actionKeyArray.pop();
  }

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  let type: any = actionType;
  for (const actionKey of actionKeyArray) {
    type = type[actionKey];
  }

  return type as string;
};

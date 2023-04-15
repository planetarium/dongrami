import Actions from '@/actions.json';
import Flat from 'flattype';
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

const getSubObject = (action: ActionType, flatKey: string) => {
  const keyArray = flatKey.split('__');
  let type: ActionType = action;

  for (const key of keyArray) {
    type = type[key] as unknown as ActionType;
  }

  if (typeof type === 'object' && '__array' in type) {
    // rome-ignore lint/performance/noDelete: <explanation>
    delete type.__array;
  }

  return type;
};

const store = devtools<ActionState>((set) => ({
  data: Flat.from({}),
  mutations: {
    setAction: (action: keyof typeof Actions) => {
      set({
        action,
        data: Flat.from(
          actionToObject(Actions[action] as unknown as ActionType)
        ),
      });
    },
    setValue: (key, value) =>
      set((state) => ({ data: state.data.set(key, value) })),
    appendValue: (flatKey) =>
      set((state) => {
        if (!state.action) {
          return state;
        }

        const subObject = getSubObject(
          Actions[state.action] as unknown as ActionType,
          flatKey
        );

        const data = state.data;

        data.append(
          flatKey,
          typeof subObject === 'object' ? actionToObject(subObject) : ''
        );

        console.log(data.getData());

        return { ...state, data };
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
  const flat = useActionFlat();

  if (!action) {
    return undefined;
  }

  const actionType = Actions[action];

  const actionKeyArray = key.split('__');
  const isArray = Array.isArray(flat.get(key));
  const isObject =
    actionKeyArray[actionKeyArray.length - 1].trim() === '' && !isArray;

  if (isObject) {
    return '__object';
  }

  if (isArray) {
    return '__array';
  }

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  let type: any = actionType;
  for (const actionKey of actionKeyArray) {
    type = type[actionKey];
  }

  return type as string;
};

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const onboardingStepState = atom<number>({
  key: "onboardingStepState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const onboardingImageState = atom<string | undefined>({
  key: "onboardingImageState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const recipeDetailState = atom<Object | undefined>({
  key: "recipeDetailState",
  default: undefined,
});
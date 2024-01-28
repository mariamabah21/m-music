import { actions } from "./actions";

export const initialState = {
  track: null,
  tracks: [],
  isPlaying: false,
};

export function playerReducer(state, action) {
  switch (action.type) {
    case actions.SET_TRACKS_DATA:
      return {
        ...state,
        isPlaying: action.isPlaying,
        track: action.track,
        tracks: action.tracks,
      };
    case actions.TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case actions.NEXT_SONG:
      if (!state.tracks || !state.track) return;

      const currentSongIndex = state.tracks.findIndex((track) => track.id === state.track.id);
      return {
        ...state,
        track: state.tracks[currentSongIndex + 1],
      };
  }
}

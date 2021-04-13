const initialState = {
	playlists: [
		{ id: 0, title: "Coloring Book1", img: "img/poster-1.jpg", plays: 100_000, likes: 50_000 },
		{ id: 1, title: "Coloring Book2", img: "img/poster-2.jpg", plays: 100_000, likes: 50_000 },
		{ id: 2, title: "Coloring Book3", img: "img/poster-3.jpg", plays: 100_000, likes: 50_000 },
		{ id: 3, title: "Coloring Book4", img: "img/poster-4.png", plays: 100_000, likes: 50_000 }
	],
	music: [
		{ id: 0, title: "song1", img: "img/poster-1.jpg", artist: "artist-1", plays: 100_000, likes: 50_000 },
		{ id: 1, title: "song2", img: "img/poster-2.jpg", artist: "artist-2", plays: 100_000, likes: 50_000 },
		{ id: 2, title: "song3", img: "img/poster-3.jpg", artist: "artist-3", plays: 100_000, likes: 50_000 },
	],
	// player: {
	// 	songUrl: "",
	// 	activeTrack: null,
	// 	isPlaying: false,
	// 	currentSongIndex: null,
	// 	volume: 0.1,
	// },
	// user: {
	// 	name: 'Thomas Baker',
	// 	email: 'email@email.com',
	// 	img: "/img/profile.jpg"
	// },
	sidebar: {
		open: false
	}
}

export default initialState
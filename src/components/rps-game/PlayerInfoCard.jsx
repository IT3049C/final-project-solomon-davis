import { avatars } from "../../logic/avatars";

export function PlayerInfoCard({ playerName, playerAvatar }) {
  const selectedAvatar = avatars.find(a => a.key === playerAvatar);
  console.log(playerAvatar);
  console.log(playerName);
  return (
    <section aria-labelledby="player-info-heading" className="card">
      <h2 id="player-info-heading">Player Info</h2>
      <div role="status" aria-live="polite" data-testid="greeting">
        {playerName ? `Welcome ${playerName}!` : null}
      </div>
      <div className="player-avatar">
        <img
          id="current-avatar"
          src={selectedAvatar?.image ?? avatars.defaultAvatar}
          alt="Player avatar"
          width={"220px"}
          height={"220px"}
          display={"flex"}
        />
        <span id="player-name">{playerName}</span>
      </div>
    </section>
  );
}

export default function Tabs({ tab, setTab }) {
  return (
    <div className="tabs">
      <div
        className={tab === "published" ? "active" : ""}
        onClick={() => setTab("published")}
      >
        Published
      </div>
      <div
        className={tab === "unpublished" ? "active" : ""}
        onClick={() => setTab("unpublished")}
      >
        Unpublished
      </div>
    </div>
  );
}


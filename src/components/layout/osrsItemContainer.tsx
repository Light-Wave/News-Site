import OsrsItem from "./osrsItem";

export default function OsrsItemContainer() {
  const itemIds = ["4151", "11804", "20997"];
  return (
    <section>
      <div className="pt-3">
        {itemIds.map((id, index) => (
          <OsrsItem
            key={id}
            itemId={id}
            className={
              index < itemIds.length - 1
                ? "border-b border-b-primary"
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}

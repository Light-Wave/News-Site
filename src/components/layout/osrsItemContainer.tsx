import OsrsItem from "./osrsItem";

export default function OsrsItemContainer() {
  return (
    <section>
        <div className="pt-3">
          <OsrsItem itemId={"20997"} className="border-b border-b-primary" />
          <OsrsItem itemId={"4151"} className="border-b border-b-primary" />
          <OsrsItem itemId={"11804"} />
        </div>
    </section>
  );
}

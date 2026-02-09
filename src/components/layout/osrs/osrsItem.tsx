import { getOsrsItemData } from "@/actions/osrs-item-data";
import Image from "next/image";

export default async function OsrsItem({
  itemId,
  className = "",
}: {
  itemId: string;
  className?: string;
}) {
  const item = await getOsrsItemData(itemId);

  const upArrow = (
    <svg
      color="darkgreen"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-trending-up-icon lucide-trending-up"
    >
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
    </svg>
  );
  const downArrow = (
    <svg
      color="darkred"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-trending-down-icon lucide-trending-down"
    >
      <path d="M16 17h6v-6" />
      <path d="m22 17-8.5-8.5-5 5L2 7" />
    </svg>
  );

  return (
    <div className={`${className}`}>
      {item.success ? (
        <>
          <h3 className="text-center font-bold">{item.data.name}</h3>
          <div className="grid col-3">
            <div className="col-start-2 pl-4 sm:col-start-1 sm:pt-3 sm:p-2">
              <p>Price: {item.data.current.price}</p>
              <p>{item.data.day30.change}</p>
              <p>
                {item.data.day30.trend === "negative" ? downArrow : upArrow}
              </p>
            </div>
            <div className="col-start-3">
              <Image
                alt="Oldschool-Runescape item"
                src={item.data.icon_large}
                width={100}
                height={100}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-sm text-muted-foreground">
          Unable to load item data.
        </div>
      )}
    </div>
  );
}

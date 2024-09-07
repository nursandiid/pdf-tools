import { Log } from "@/types/log";
import { Paginate } from "@/types/paginate";

import Service from "@/components/activity/Service";
import BadgeStatus from "@/components/activity/BadgeStatus";
import Actions from "@/components/activity/Actions";

type TableProps = {
  data: Paginate<Log[]>;
};

export default function Table({ data }: TableProps) {
  return (
    <div className="overflow-auto">
      <table className="w-full table-auto divide-y divide-gray-200 dark:divide-gray-500/25">
        <thead className="bg-secondary text-foreground">
          <th scope="col" className="w-4 p-4 text-center">
            No
          </th>
          <th scope="col" className="p-4 text-center">
            Date
          </th>
          <th scope="col" className="p-4 text-center">
            Tool
          </th>
          <th scope="col" className="p-4 text-center">
            Status
          </th>
          <th scope="col" className="p-4 text-center" />
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm text-foreground dark:divide-secondary">
          {data.data.map((item, index) => {
            const date = new Date(item.created_at);
            const options: Intl.DateTimeFormatOptions = {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            };

            const formattedDate = date
              .toLocaleDateString("id-ID", options)
              .replace(",", "")
              .replace(".", ":");

            return (
              <tr className="hover:bg-secondary/50" key={`row-${index}`}>
                <td className="p-4 text-center">
                  {data.current_page
                    ? index + 1 + (data.current_page - 1) * data.per_page
                    : index + 1}
                </td>
                <td className="p-4">{formattedDate}</td>
                <td className="p-4">
                  <Service item={item} />
                </td>
                <td className="p-4">
                  <BadgeStatus item={item} />
                </td>
                <td className="p-4">
                  <Actions item={item} />
                </td>
              </tr>
            );
          })}

          {data.data.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center">
                Data is empty
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

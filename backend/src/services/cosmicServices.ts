import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_BUCKET_READ_KEY!,
  writeKey: process.env.COSMIC_BUCKET_WRITE_KEY!,
});

console.log("Bucket Slug:", process.env.COSMIC_BUCKET);
console.log("Read Key:", process.env.COSMIC_READ_KEY);
console.log("Write Key:", process.env.COSMIC_WRITE_KEY);

//Save appointment to Cosmic
export const saveAppointment = async (appointment: {
  date: string;
  slot: number;
  name: string;
  email: string;
  phone: string;
}) => {
  try {
    await cosmic.objects.insertOne({
      title: appointment.name,
      type: "appointments",
      metadata: {
        date: appointment.date,
        slot: appointment.slot,
        email: appointment.email,
        phone: appointment.phone,
      },
    });
    console.log("Appointment saved to Cosmic successfully");
  } catch (error) {
    console.error("Failed to save appointment to Cosmic", error);
    throw error;
  }
};

//// An interface for the structure of the objects returned by the Cosmic API
interface CosmicAppointment{
    title: string;
    metadata: {
        date: string;
        slot: number;
        email: string;
        phone: string;
    }

}
//Get all appointments
export const getAppointments = async () => {
  try {
    //Fetch all appointments from Cosmic
    //Fetches objects of type "appointments" and limits the result to 20
    const allAppointments = await cosmic.objects
      .find({
        type: "appointments",
      })
      .props(["title", "metadata"])
      .limit(20);

      // Map over the fetched objects and transform them into a simpler format
      return allAppointments.objects?.map((obj: CosmicAppointment) => ({
        name: obj.title, //Extract name from title
        date: obj.metadata.date, //Extract date from metadata
        slot: obj.metadata.slot, //Extract slot from metadata
        email: obj.metadata.email, //Extract email from metadata
        phone: obj.metadata.phone, //Extract phone from metadata
      }))
  } catch (error) {
    console.error("Failed to fetch appointments from Cosmic", error);
    throw error;
  }
};

//Delete an appointment by ID

export const deleteAppointment = async (id: string) => {
    try {
        await cosmic.objects.deleteOne(id);
        console.log(`Appointment with ID ${id} deleted successfully`);
        
    } catch (error) {
        console.error("Failed to delete appointment from cosmic", error);
        throw error;
        
    }
}

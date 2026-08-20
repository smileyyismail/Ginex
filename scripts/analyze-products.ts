import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
  const { data: products } = await supabase.from('products').select('name');
  const models = products!.map(p => p.name.split(' ')[0]);
  const duplicates = models.filter((item, index) => models.indexOf(item) !== index);
  console.log("Duplicates: ", duplicates);
}

main();

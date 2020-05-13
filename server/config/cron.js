import cron from 'node-cron';
import SSAController from '../controllers/SSAController';

cron.schedule(
  '0 1 * * *',
  () => {
    console.log('Running a job at 01:00 at America/Chicago timezone');
    SSAController.syncAllSsaStyles();
  },
  {
    scheduled: true,
    timezone: 'America/Chicago',
  },
);

import { getMenuJob } from '../offers';
import { serviceJobsForType } from './jobs';

/** Small "Jobs I set up for <who>" block on the /for pages, linking to the matching /services pages. */
export function JobLinks({ typeId, who, inline = false }: { typeId: string; who: string; inline?: boolean }) {
  const jobs = serviceJobsForType(typeId).slice(0, inline ? 3 : 5);
  if (!jobs.length) return null;
  const Wrap = inline ? 'div' : 'section';
  return (
    <Wrap className={inline ? undefined : 'mw-qw-section'} aria-labelledby={`jobs-${typeId}-title`}>
      {inline ? <h3 id={`jobs-${typeId}-title`}>Jobs I set up for {who}</h3> : <h2 id={`jobs-${typeId}-title`}>Jobs I set up for {who}.</h2>}
      <p className="mw-qw-lead">
        {jobs.map((job) => <a key={job.id} className="s-details-link" href={`/services/${job.id}`}>{getMenuJob(job.id).name} →</a>)}{' '}
        <a className="s-details-link" href="/services">All jobs →</a>
      </p>
    </Wrap>
  );
}

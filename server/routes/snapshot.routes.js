import { Router } from 'express';
import * as SnapshotController from '../controllers/snapshot.controller';
const router = new Router();

// Get all snapshots
router.route('/snapshots/:placeName').get(SnapshotController.getSnapshots);

// Get all snapshots (legacy)
router.route('/snapshots-legacy/:placeName').get(SnapshotController.getSnapshotsLegacy);

// Get one snapshot by cuid
//router.route('/snapshots/:cuid').get(SnapshotController.getSnapshot);

// Add a new snapshot
router.route('/snapshots').post(SnapshotController.addSnapshot);

// Add a new snapshot (legacy)
router.route('/snapshots/legacy').post(SnapshotController.addSnapshotLegacy);

// Delete a snapshot by cuid
//router.route('/snapshots/:cuid').delete(SnapshotController.deleteSnapshot);

export default router;

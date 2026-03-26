import { useState } from "react";
import { Header } from "./components/Header";
import { UrlInput } from "./components/UrlInput";
import { MediaGrid } from "./components/MediaGrid";
import { SessionPanel } from "./components/SessionPanel";
import { HowToUse } from "./components/HowToUse";
import { extractMedia } from "./api";
import { MediaItem, StatusState } from "./types";

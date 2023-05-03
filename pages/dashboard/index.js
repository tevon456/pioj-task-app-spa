import "styled-components/macro";

import {
  Article,
  Asterisk,
  CalendarBlank,
  CheckSquareOffset,
  Clock,
  Eye,
  Hourglass,
  Lightning,
  PencilSimple,
  Plus,
  TrashSimple,
  UserCircle,
} from "@phosphor-icons/react";
import { Content, UICore } from "../../components";
import { TinyDansk, db, paths } from "../../utils";
import { useDialog, useRender } from "../../hooks";
import { useEffect, useState } from "react";

import CreateTaskForm from "../../forms/CreateTaskForm";
import Head from "next/head";
import UpdateTaskForm from "../../forms/UpdateTaskForm";
import { parse } from "date-fns";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [taskList, setTaskList] = useState([]);
  const [watch, refresh] = useRender();
  const [mutateTaskBody, setMutateTaskBody] = useState(null);
  const [notStartedCount, setNotStartedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [pastDueCount, setPastDueCount] = useState(0);

  let id = router?.query?.id;

  const {
    open: isCreateTaskModalOpen,
    toggle: toggleCreateTaskModal,
    Dialog: CreateTaskModal,
  } = useDialog();

  const {
    open: isReadTaskModalOpen,
    toggle: toggleReadTaskModal,
    Dialog: ReadTaskModal,
  } = useDialog();

  const {
    open: isUpdateTaskModalOpen,
    toggle: toggleUpdateTaskModal,
    Dialog: UpdateTaskModal,
  } = useDialog();

  const {
    open: isDeleteTaskModalOpen,
    toggle: toggleDeleteTaskModal,
    Dialog: DeleteTaskModal,
  } = useDialog();

  useEffect(async () => {
    setTaskList((await db.task.readAll()) || []);
  }, [watch]);

  useEffect(() => {
    setNotStartedCount(
      TinyDansk.selectObjectFromArray(taskList, "status", "not yet started")
        ?.length || 0
    );
    setInProgressCount(
      TinyDansk.selectObjectFromArray(taskList, "status", "in progress")
        ?.length || 0
    );
    setCompletedCount(
      TinyDansk.selectObjectFromArray(taskList, "status", "completed")
        ?.length || 0
    );
    setPastDueCount(
      TinyDansk.selectObjectFromArray(taskList, "status", "past due")?.length ||
        0
    );
  }, [taskList]);

  useEffect(async () => {
    if (id) {
      let task = await db.task.read(id);

      if (task) {
        setMutateTaskBody(task);
        toggleReadTaskModal();
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="PIOJ Tasks App" />
        <meta property="og:title" content="Dashboard" />
        <meta property="og:description" content="PIOJ Tasks App" />
      </Head>
      <main
        css={`
          color: var(--text-light);
          transition-timing-function: var(--animation);
          transition-duration: background var(--animation-duration);
          transition: background var(--animation-time);
        `}
      >
        <Content.AppShell>
          <Content.SubPage
            title="Tasks"
            actions={
              <div>
                <UICore.Button
                  onClick={() => {
                    toggleCreateTaskModal();
                  }}
                  size="sm"
                >
                  <Plus size={22} /> <UICore.Space amount={1} /> New Task
                </UICore.Button>
              </div>
            }
          >
            {taskList.length > 0 && (
              <Content.Card mb="var(--space-md)">
                <Progress
                  showKeys={true}
                  percentageValue={true}
                  sections={[
                    {
                      color: "var(--completed)",
                      value: completedCount,
                      key: "completed",
                    },
                    {
                      color: "var(--in-progress)",
                      value: inProgressCount,
                      key: "in progress",
                    },
                    {
                      color: "var(--past-due)",
                      value: pastDueCount,
                      key: "past due",
                    },
                    {
                      color: "#393e41",
                      value: notStartedCount,
                      key: "not yet started",
                    },
                  ]}
                />
              </Content.Card>
            )}
            <Content.Card>
              <UICore.Flex justify="center" wrap="wrap" gap="var(--space-sm)">
                {taskList.length > 0 ? (
                  taskList.map((task) => (
                    <TaskCard
                      key={task?.id}
                      task={task}
                      setMutateTaskBody={setMutateTaskBody}
                      toggleReadTaskModal={toggleReadTaskModal}
                      toggleDeleteTaskModal={toggleDeleteTaskModal}
                      toggleUpdateTaskModal={toggleUpdateTaskModal}
                    />
                  ))
                ) : (
                  <EmptyTaskState
                    toggleCreateTaskModal={toggleCreateTaskModal}
                  />
                )}
              </UICore.Flex>
            </Content.Card>
          </Content.SubPage>
        </Content.AppShell>
      </main>
      <CreateTaskModal
        name="New Task"
        width="clamp(300px,40vw,500px)"
        close={() => {
          toggleCreateTaskModal();
        }}
        open={isCreateTaskModalOpen}
      >
        <CreateTaskForm
          onSuccess={() => {
            refresh();
            toggleCreateTaskModal();
          }}
        />
      </CreateTaskModal>

      <ReadTaskModal
        name={mutateTaskBody?.title}
        width="clamp(300px,40vw,500px)"
        close={() => {
          setMutateTaskBody(null);
          toggleReadTaskModal();
        }}
        open={isReadTaskModalOpen}
      >
        <UICore.Line
          variant="h"
          thickness="2px"
          length="100%"
          color="var(--neutral-500)"
          mg="var(--space-none)"
          mb="var(--space-xs)"
          pd="var(--space-none)"
        />
        <UICore.Flex gap="var(--space-sm)">
          {mutateTaskBody?.status === "not yet started" ? (
            <UICore.Badge bg="var(--pending-bg)" color="var(--pending)">
              <UICore.Flex align="center">
                <Hourglass size={18} color="#ffffff" />
                <UICore.Space amount={1} /> not yet started
              </UICore.Flex>
            </UICore.Badge>
          ) : mutateTaskBody?.status === "in progress" ? (
            <UICore.Badge bg="var(--in-progress-bg)" color="var(--in-progress)">
              <UICore.Flex align="center">
                <Lightning size={18} color="var(--in-progress)" />
                <UICore.Space amount={1} /> in progress
              </UICore.Flex>
            </UICore.Badge>
          ) : mutateTaskBody?.status === "completed" ? (
            <UICore.Badge bg="var(--completed-bg)" color="var(--completed)">
              <UICore.Flex align="center">
                <CheckSquareOffset size={18} color="var(--completed)" />
                <UICore.Space amount={1} /> completed
              </UICore.Flex>
            </UICore.Badge>
          ) : mutateTaskBody?.status === "past due" ? (
            <UICore.Badge bg="var(--past-due-bg)" color="var(--past-due)">
              <UICore.Flex align="center">
                <Clock size={18} color="var(--past-due)" />
                <UICore.Space amount={1} /> past due
              </UICore.Flex>
            </UICore.Badge>
          ) : (
            <UICore.Badge bg="var(--pending-bg)" color="var(--pending)">
              <UICore.Flex align="center">
                <Hourglass size={18} color="#ffffff" />
                <UICore.Space amount={1} /> not yet started
              </UICore.Flex>
            </UICore.Badge>
          )}
        </UICore.Flex>

        <UICore.Text
          size="sm"
          mt="var(--space-md)"
          mb="var(--space-xxxs)"
          weight="400"
          color="var(--neutral-600)"
        >
          <UICore.Flex align="center">
            <Asterisk size={18} color="var(--neutral-600)" />
            <UICore.Space amount={1} />
            ID
          </UICore.Flex>{" "}
        </UICore.Text>

        <UICore.Text
          mt="var(--space-none)"
          mb="var(--space-md)"
          weight="400"
          color="var(--neutral-200)"
        >
          {mutateTaskBody?.id}
        </UICore.Text>

        <UICore.Text
          size="sm"
          mt="var(--space-md)"
          mb="var(--space-xxxs)"
          weight="400"
          color="var(--neutral-600)"
        >
          <UICore.Flex align="center">
            <CalendarBlank size={18} color="var(--neutral-600)" />
            <UICore.Space amount={1} />
            DUE DATE
          </UICore.Flex>{" "}
        </UICore.Text>

        <UICore.Text
          mt="var(--space-none)"
          mb="var(--space-md)"
          weight="400"
          color="var(--neutral-200)"
        >
          {parse(
            mutateTaskBody?.dueDate,
            "yyyy-MM-dd",
            new Date()
          ).toDateString()}
        </UICore.Text>

        <UICore.Text
          size="sm"
          mt="var(--space-none)"
          mb="var(--space-xxxs)"
          weight="400"
          color="var(--neutral-600)"
        >
          <UICore.Flex align="center">
            <UserCircle size={18} color="var(--neutral-600)" />
            <UICore.Space amount={1} />
            ASSIGNEE
          </UICore.Flex>{" "}
        </UICore.Text>
        <UICore.Flex>
          <UICore.Text
            mt="var(--space-none)"
            mb="var(--space-md)"
            weight="400"
            color="var(--primary)"
            as="button"
            onClick={() => {
              router.push(
                `${paths.EMPLOYEE_LIST}?id=${mutateTaskBody?.employee?.id}`
              );
            }}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              background: "transparent",
              border: "none",
            }}
          >
            {mutateTaskBody?.employee?.name}
          </UICore.Text>
        </UICore.Flex>

        <UICore.Text
          size="sm"
          mt="var(--space-none)"
          mb="var(--space-xxxs)"
          weight="400"
          color="var(--neutral-600)"
        >
          <UICore.Flex align="center">
            <Article size={18} color="var(--neutral-600)" />
            <UICore.Space amount={1} />
            DESCRIPTION
          </UICore.Flex>{" "}
        </UICore.Text>
        <UICore.Text
          mt="var(--space-none)"
          mb="var(--space-md)"
          weight="400"
          color="var(--neutral-200)"
        >
          {mutateTaskBody?.description}
        </UICore.Text>
      </ReadTaskModal>

      <UpdateTaskModal
        name="Update Task"
        width="clamp(300px,40vw,500px)"
        close={() => {
          toggleUpdateTaskModal();
        }}
        open={isUpdateTaskModalOpen}
      >
        <UpdateTaskForm
          onSuccess={() => {
            refresh();
            toggleUpdateTaskModal();
          }}
          id={mutateTaskBody?.id}
          data={mutateTaskBody}
        />
      </UpdateTaskModal>

      <DeleteTaskModal
        name="Delete task"
        width="clamp(300px,40vw,500px)"
        close={() => {
          setMutateTaskBody(null);
          toggleDeleteTaskModal();
        }}
        open={isDeleteTaskModalOpen}
      >
        <UICore.Text mt="4px" color="var(--text-light)">
          Are you sure you want to delete this task? This is a permanent action.
        </UICore.Text>

        <UICore.Flex justify="flex-end">
          <UICore.Button
            kind="danger"
            onClick={async () => {
              await db.task.destroy(mutateTaskBody?.id);
              refresh();
              toggleDeleteTaskModal();
            }}
          >
            Yes, delete
          </UICore.Button>
          <UICore.Space amount={2} />
          <UICore.Button
            onClick={() => {
              setMutateTaskBody(null);
              toggleDeleteTaskModal();
            }}
            kind="secondary"
          >
            Cancel
          </UICore.Button>
        </UICore.Flex>
      </DeleteTaskModal>
    </>
  );
}

function EmptyTaskState({ toggleCreateTaskModal = () => {} }) {
  return (
    <UICore.Box>
      <UICore.Text
        align="center"
        weight="bold"
        size="md"
        mb="var(--space-xxxs)"
        color="var(--text-light)"
      >
        No Task
      </UICore.Text>
      <UICore.Flex
        justify="center"
        mg="var(--space-none)"
        pd="var(--space-none)"
        width="300px"
        as={UICore.Box}
      >
        <UICore.Text align="center" color="var(--neutral-300)">
          Let's fix that click the "+ New Task" button to create your first
          task.
        </UICore.Text>
      </UICore.Flex>
      <UICore.Flex justify="center">
        <UICore.Button onClick={() => toggleCreateTaskModal()}>
          <Plus size={22} /> <UICore.Space amount={1} /> New Task
        </UICore.Button>
      </UICore.Flex>
    </UICore.Box>
  );
}

function TaskCard({
  task = {},
  setMutateTaskBody = () => {},
  toggleReadTaskModal = () => {},
  toggleDeleteTaskModal = () => {},
  toggleUpdateTaskModal = () => {},
}) {
  return (
    <UICore.Box
      mg="var(--space-none)"
      px="var(--space-none)"
      py="var(--space-sm)"
      pb="var(--space-md)"
      width="100%"
      css={`
        border-bottom: 1px solid var(--neutral-700);

        &:nth-last-child(1) {
          border-bottom: 1px solid transparent;
        }
      `}
    >
      <UICore.Flex justify="space-between" align="center">
        <UICore.Text
          size="md"
          mt="var(--space-none)"
          mb="var(--space-none)"
          weight="500"
          color="var(--text-light)"
          className="truncate"
          style={{ maxWidth: "260px" }}
        >
          {task?.title}
        </UICore.Text>
        <div>
          <UICore.Flex gap="var(--space-xs)">
            <div>
              <UICore.Button
                aria-label="View"
                data-balloon-pos="up"
                bg="transparent"
                hover="var(--neutral-700)"
                kind="secondary"
                size="xs"
                onClick={() => {
                  setMutateTaskBody(task);
                  toggleReadTaskModal();
                }}
              >
                <Eye size={22} color="#ffffff" />
              </UICore.Button>
            </div>
            <div>
              <UICore.Button
                aria-label="Update"
                data-balloon-pos="up"
                bg="transparent"
                hover="var(--neutral-700)"
                kind="secondary"
                size="xs"
                onClick={() => {
                  setMutateTaskBody(task);
                  toggleUpdateTaskModal();
                }}
              >
                <PencilSimple size={22} color="#ffffff" />
              </UICore.Button>
            </div>
            <div>
              <UICore.Button
                aria-label="Delete"
                data-balloon-pos="up"
                bg="transparent"
                hover="var(--danger)"
                kind="secondary"
                size="xs"
                onClick={() => {
                  setMutateTaskBody(task);
                  toggleDeleteTaskModal();
                }}
              >
                <TrashSimple size={22} color="#ffffff" />
              </UICore.Button>
            </div>
          </UICore.Flex>
        </div>
      </UICore.Flex>
      <UICore.Text
        size="sm"
        mt="var(--space-xxxs)"
        mb="var(--space-md)"
        weight="400"
        color="var(--neutral-400)"
      >
        Due {parse(task?.dueDate, "yyyy-MM-dd", new Date()).toDateString()}
      </UICore.Text>
      <UICore.Flex gap="var(--space-sm)">
        {task?.status === "not yet started" ? (
          <UICore.Badge bg="var(--pending-bg)" color="var(--pending)">
            <UICore.Flex align="center">
              <Hourglass size={18} color="#ffffff" />
              <UICore.Space amount={1} /> not yet started
            </UICore.Flex>
          </UICore.Badge>
        ) : task?.status === "in progress" ? (
          <UICore.Badge bg="var(--in-progress-bg)" color="var(--in-progress)">
            <UICore.Flex align="center">
              <Lightning size={18} color="var(--in-progress)" />
              <UICore.Space amount={1} /> in progress
            </UICore.Flex>
          </UICore.Badge>
        ) : task?.status === "completed" ? (
          <UICore.Badge bg="var(--completed-bg)" color="var(--completed)">
            <UICore.Flex align="center">
              <CheckSquareOffset size={18} color="var(--completed)" />
              <UICore.Space amount={1} /> completed
            </UICore.Flex>
          </UICore.Badge>
        ) : task?.status === "past due" ? (
          <UICore.Badge bg="var(--past-due-bg)" color="var(--past-due)">
            <UICore.Flex align="center">
              <Clock size={18} color="var(--past-due)" />
              <UICore.Space amount={1} /> past due
            </UICore.Flex>
          </UICore.Badge>
        ) : (
          <UICore.Badge bg="var(--pending-bg)" color="var(--pending)">
            <UICore.Flex align="center">
              <Hourglass size={18} color="#ffffff" />
              <UICore.Space amount={1} /> not yet started
            </UICore.Flex>
          </UICore.Badge>
        )}
        <UICore.Badge bg="var(--pending-bg)" color="var(--pending)">
          <UICore.Flex align="center">
            <UserCircle size={18} color="#ffffff" />
            <UICore.Space amount={1} />
            {task?.employee?.name || "-"}
          </UICore.Flex>
        </UICore.Badge>
      </UICore.Flex>
    </UICore.Box>
  );
}

function Progress({
  sections = [],
  showKeys = false,
  percentageValue = false,
}) {
  const sum = sections.reduce((accumulate, obj) => accumulate + obj?.value, 0);
  const sortedSections = sections.sort((a, b) => (a.value < b.value ? 1 : -1));

  return (
    <div>
      <UICore.Flex
        gap="var(--space-xxxs)"
        css={`
          height: max-content;
          border-radius: 12px;
          overflow: hidden;
        `}
      >
        {sortedSections.map((section) => (
          <UICore.Box
            key={section?.key}
            title={`${section?.key} ${
              percentageValue
                ? Math.round((section?.value / sum) * 100 * 100) / 100
                : section?.value
            } ${percentageValue ? "%" : ""}`}
            mg="var(--space-none)"
            bg={section?.color}
            width={`${(section?.value / sum) * 100}%`}
          />
        ))}
      </UICore.Flex>

      {showKeys && (
        <UICore.Box px="var(--space-none)" py="var(--space-md)">
          <UICore.Flex justify="flex-start" wrap="wrap" gap="var(--space-md)">
            {sortedSections.map((section) => (
              <div key={section?.key}>
                <UICore.Flex
                  align="center"
                  gap="var(--space-xxxs)"
                  wrap="no-wrap"
                >
                  <UICore.Box
                    mg="var(--space-none)"
                    bg={section?.color}
                    width="4px"
                    height="4px"
                    pd="var(--space-xxs)"
                    radius="1000px"
                  />
                  <UICore.Text
                    mt="var(--space-none)"
                    mb="var(--space-none)"
                    weight="300"
                    size="sm"
                    color="var(--text-light)"
                  >
                    <b>{section?.key}</b>{" "}
                    {percentageValue
                      ? Math.round((section?.value / sum) * 100 * 100) / 100
                      : section?.value}{" "}
                    {percentageValue && "%"}
                  </UICore.Text>
                </UICore.Flex>
              </div>
            ))}
          </UICore.Flex>
        </UICore.Box>
      )}
    </div>
  );
}
